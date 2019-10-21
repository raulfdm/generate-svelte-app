module.exports = {
  branch: 'master',
  repositoryUrl: 'git@github.com:raulfdm/generate-svelte-app.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
};
