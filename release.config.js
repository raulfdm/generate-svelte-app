module.exports = {
  branch: 'master',
  repositoryUrl: 'https://github.com/raulfdm/generate-svelte-app',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
};
