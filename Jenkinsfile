pipeline {  
  agent none
  stages {
     agent {
        docker {
          image 'node:14.16.1-alpine'
        }
      }
    
      stage('Build') {
        steps {
          sh 'npm i sqlite3 -D && rm -rf node_modules && npm i && npm rebuild'
        }
      }  

      stage('Test') {
        steps {
          sh 'npm run test'
        }
      }
  }
}
