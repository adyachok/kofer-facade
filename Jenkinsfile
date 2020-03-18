/*
 * Annotation below treats the ods-jenkins-shared-library as global, meaning that the library runs outside of sandbox restrictions
 * https://jenkins.io/doc/book/pipeline/shared-libraries/#global-shared-libraries
 */
@Library('ods-jenkins-shared-library@production') _

/* generated jenkins file used for building and deploying facade in projects zz */
def final projectId = 'zz'
def final componentId = 'facade'
def final credentialsId = "${projectId}-cd-cd-user-with-password"
def dockerRegistry
node {
  dockerRegistry = env.DOCKER_REGISTRY
}

/*
  See readme of shared library for usage and customization
  @ https://github.com/opendevstack/ods-jenkins-shared-library/blob/master/README.md
  eg. to create and set your own builder slave instead of
  the base slave used here - the code of the base slave can be found at
  https://github.com/opendevstack/ods-core/tree/master/jenkins/slave-base
 */
odsPipeline(
  image: "${dockerRegistry}/cd/jenkins-slave-nodejs10-angular:2.x",
  projectId: projectId,
  componentId: componentId,
  branchToEnvironmentMapping: [
    'master': 'test',
    '*': 'dev'
  ]
) { context ->
  stageBuild(context)
  //stageUnitTest(context)
  /*
   * if you want to introduce scanning, uncomment
   *
   * stageScanForSonarqube(context)
   */
  stageStartOpenshiftBuild(context)
  stageDeployToOpenshift(context)
}

def stageBuild(def context) {
  stage('Build') {
    withEnv(["TAGVERSION=${context.tagversion}", "NEXUS_HOST=${context.nexusHost}"]) {
      sh "npm install"
      sh "npm run build"
    }
    sh "cp -r dist/${context.componentId} docker/dist"
  }
}

def stageUnitTest(def context) {
  try {
    stage('Unit Test') {
      sh "npm run test"
    }
  } finally {
    junit 'build/test-results/test/test-results.xml'
  }
}

def stageLint(def context) {
  stage('Lint') {
    sh "npm run lint"
  }
}
