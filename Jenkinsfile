pipeline {  
  stages {
      stage('Build') {
        agent {
          docker {
            image 'node:14.16.1-alpine'
          }
        
          steps('Install') {
            sh 'npm i sqlite3 -D && rm -rf node_modules && npm i && npm rebuild'
          }

          steps('Test') {
            sh 'npm run test'
          }
        }
      }
  }
}
