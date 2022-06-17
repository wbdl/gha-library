const core = require('@actions/core');

try {
  const baseBranch = core.getInput('base-branch')
  const mainBranch = core.getInput('main-branch')
  const prodBranch = core.getInput('prod-branch')
  const rcBranchRegex = core.getInput('rc-branch-regex')
  // const baseBranch = 'rc/v1.0.0'
  // const mainBranch = 'develop'
  // const prodBranch = 'master'
  // const rcBranchRegex = '^rc\/v.*'

  const rcRe = new RegExp(rcBranchRegex);
  var output = [];

  if (baseBranch == mainBranch) {
    output = ['dev', 'qa'];
  } else if (rcRe.test(baseBranch)) {
    output = ['rc'];
  } else if (baseBranch == prodBranch) {
    output = ['pre', 'prod'];
  } else {
    output = ['dev', 'qa', 'rc', 'pre', 'prod'];
  }
  console.log(output)
  core.setOutput('matrix', output)
} catch (error) {
  core.setFailed(error.message);
}
