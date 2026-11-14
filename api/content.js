import crypto from 'crypto';

const REPO_OWNER = 'flyzosolutions-tech';
const REPO_NAME = 'flyzo';
const CONTENT_FILE_PATH = 'public/content.json';
const ALLOWED_EMAILS = ['flyzosolutions@gmail.com', 'admin@flyzo.info', 'flyzo'];

// AES-256-GCM encrypted repository token (keyed solely by the Admin Password)
const ENCRYPTED_CRED = {
  salt: 'flyzo-studio-salt-2026',
  iv: '8adcdf263d28bdf381d97108',
  tag: 'e8163c87942c0a0d30c4b56b2c4577cb',
  data: 'c81cea062f876f00d1d30f98b7ae78f6f228c4fc5b54a8d6db39464941517438840d47c5ca833049',
};

function resolveGitHubToken(password) {
  if (!password || typeof password !== 'string') return null;
  if (process.env.GITHUB_TOKEN && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    return process.env.GITHUB_TOKEN;
  }
  try {
    const key = crypto.scryptSync(password.trim(), ENCRYPTED_CRED.salt, 32);
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(ENCRYPTED_CRED.iv, 'hex')
    );
    decipher.setAuthTag(Buffer.from(ENCRYPTED_CRED.tag, 'hex'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(ENCRYPTED_CRED.data, 'hex')),
      decipher.final(),
    ]).toString('utf8');
    return decrypted;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/content -> Fetch live content.json immediately from GitHub Contents API
  if (req.method === 'GET') {
    try {
      const ghUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_FILE_PATH}?ref=main&t=${Date.now()}`;
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Flyzo-Content-Studio',
      };
      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      }
      const response = await fetch(ghUrl, { headers, cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`GitHub API responded ${response.status}`);
      }
      const fileData = await response.json();
      const rawJson = Buffer.from(fileData.content, 'base64').toString('utf8');
      const parsed = JSON.parse(rawJson);
      return res.status(200).json({
        ok: true,
        sha: fileData.sha,
        content: parsed,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: err.message || 'Failed to load live content',
      });
    }
  }

  // POST /api/content -> Admin actions (login, save-content, upload-image)
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { action, email, password, content, fileName, fileBase64 } = body;

      const normalizedEmail = (email || '').toLowerCase().trim();
      if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
        return res.status(401).json({
          ok: false,
          error: 'Invalid Admin Email. Use flyzosolutions@gmail.com',
        });
      }

      const ghToken = resolveGitHubToken(password);
      if (!ghToken) {
        return res.status(401).json({
          ok: false,
          error: 'Invalid Admin Password. Please check your password and try again.',
        });
      }

      if (action === 'login') {
        return res.status(200).json({
          ok: true,
          message: 'Welcome to Flyzo Content Studio!',
        });
      }

      if (action === 'save-content') {
        if (!content || typeof content !== 'object') {
          return res.status(400).json({ ok: false, error: 'Missing content payload' });
        }

        const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_FILE_PATH}?ref=main`;
        const getRes = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Flyzo-Content-Studio',
          },
        });

        let currentSha = undefined;
        if (getRes.ok) {
          const existing = await getRes.json();
          currentSha = existing.sha;
        }

        const encodedContent = Buffer.from(JSON.stringify(content, null, 2), 'utf8').toString('base64');
        const putRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_FILE_PATH}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
              'User-Agent': 'Flyzo-Content-Studio',
            },
            body: JSON.stringify({
              message: 'Update website content via Flyzo Handle Portal (handle.flyzo.info)',
              content: encodedContent,
              sha: currentSha,
              branch: 'main',
            }),
          }
        );

        if (!putRes.ok) {
          const errText = await putRes.text();
          return res.status(500).json({
            ok: false,
            error: `GitHub commit failed: ${errText}`,
          });
        }

        const putData = await putRes.json();
        return res.status(200).json({
          ok: true,
          commitSha: putData.commit?.sha,
          message: 'Published live to flyzo.info!',
        });
      }

      if (action === 'upload-image') {
        if (!fileName || !fileBase64) {
          return res.status(400).json({ ok: false, error: 'Missing fileName or fileBase64' });
        }
        const cleanName = fileName
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, '-')
          .replace(/-+/g, '-');
        const targetPath = `public/uploads/${Date.now()}-${cleanName}`;
        const rawBase64 = fileBase64.includes(',') ? fileBase64.split(',')[1] : fileBase64;

        const putRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${targetPath}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
              'User-Agent': 'Flyzo-Content-Studio',
            },
            body: JSON.stringify({
              message: `Upload media ${cleanName} via Flyzo Handle Portal`,
              content: rawBase64,
              branch: 'main',
            }),
          }
        );

        if (!putRes.ok) {
          const errText = await putRes.text();
          return res.status(500).json({
            ok: false,
            error: `Image upload failed: ${errText}`,
          });
        }

        const rawImageUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${targetPath}`;
        return res.status(200).json({
          ok: true,
          imageUrl: rawImageUrl,
        });
      }

      return res.status(400).json({ ok: false, error: 'Unknown action' });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: err.message || 'Server error processing request',
      });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
