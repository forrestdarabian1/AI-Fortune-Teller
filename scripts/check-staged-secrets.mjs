/**
 * Scans staged file contents for likely API keys / secrets before commit.
 * Exits 1 if a match is found or if .env is staged.
 */
import { execSync } from 'node:child_process'

const BLOCKED_PATHS = new Set(['.env', '.env.local', '.env.production'])

/** Minimum length of the segment after "apv_" to treat as a real key (not docs). */
const APV_KEY_MIN_LENGTH = 16

/** Suffixes that are documentation placeholders, not real APIVerve keys. */
const PLACEHOLDER_SUFFIX =
  /^(?:your|my|insert|replace|example|xxx+|test|fake|dummy|changeme|sample|placeholder|api|key)/i

const SECRET_PATTERNS = [
  { name: 'Generic private key block', regex: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/ },
]

function stagedFiles() {
  const out = execSync('git diff --cached --name-only --diff-filter=ACMR', {
    encoding: 'utf8',
  }).trim()
  if (!out) return []
  return out.split(/\r?\n/).filter(Boolean)
}

function stagedContent(path) {
  try {
    return execSync(`git show :${path}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 })
  } catch {
    return null
  }
}

function apvSuffixLooksReal(suffix) {
  if (suffix.length < APV_KEY_MIN_LENGTH) return false
  if (PLACEHOLDER_SUFFIX.test(suffix)) return false
  return true
}

/** Find apv_<token> sequences that look like committed secrets, not doc placeholders. */
function findSuspiciousApvKeys(content) {
  const hits = []
  const re = /apv_([a-zA-Z0-9]+)/g
  let m
  while ((m = re.exec(content)) !== null) {
    if (apvSuffixLooksReal(m[1])) {
      hits.push(m[0])
    }
  }
  return hits
}

function findSuspiciousEnvAssignments(content) {
  const hits = []
  const re = /VITE_API_KEY\s*=\s*['"]?(apv_[a-zA-Z0-9]+)/g
  let m
  while ((m = re.exec(content)) !== null) {
    const suffix = m[1].slice(4)
    if (apvSuffixLooksReal(suffix)) {
      hits.push(m[0])
    }
  }
  return hits
}

const files = stagedFiles()
let failed = false

for (const file of files) {
  if (BLOCKED_PATHS.has(file) || file.startsWith('.env.')) {
    console.error(`\n✖ Refusing to commit secret env file: ${file}`)
    console.error('  Remove it from the index: git reset HEAD -- <file>\n')
    failed = true
    continue
  }

  const content = stagedContent(file)
  if (content == null) continue

  const apvKeys = findSuspiciousApvKeys(content)
  if (apvKeys.length > 0) {
    console.error(`\n✖ Possible APIVerve key in staged file "${file}"`)
    console.error('  Use .env (gitignored) for real keys; docs can use apv_your_key_here or apv_…\n')
    failed = true
  }

  const envAssigns = findSuspiciousEnvAssignments(content)
  if (envAssigns.length > 0) {
    console.error(`\n✖ Possible secret assignment in staged file "${file}": VITE_API_KEY`)
    console.error('  Use .env (gitignored) for keys, or placeholders in .env.example.\n')
    failed = true
  }

  for (const { name, regex } of SECRET_PATTERNS) {
    if (regex.test(content)) {
      console.error(`\n✖ Possible secret in staged file "${file}": ${name}`)
      console.error('  Remove the secret from staged content before committing.\n')
      failed = true
      break
    }
  }
}

if (failed) {
  process.exit(1)
}

console.log('✓ No exposed secrets detected in staged files.')
