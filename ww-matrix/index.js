const core = require('@actions/core');

try {
  const baseBranch = core.getInput('base-branch')
  const mainBranch = core.getInput('main-branch')
  const prodBranch = core.getInput('prod-branch')
  const rcBranchRegex = core.getInput('rc-branch-regex')
  const rcRe = new RegExp(rcBranchRegex);
  var output = [];

  console.log("Base: " + baseBranch)
  console.log("Main: " + mainBranch)
  console.log("Prod: " + prodBranch)
  console.log("RC:   " + rcBranchRegex)

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
