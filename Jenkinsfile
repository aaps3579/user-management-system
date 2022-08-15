pipeline {
  agent any
  
  tools { docker "docker"}
    
  stages {
         
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
