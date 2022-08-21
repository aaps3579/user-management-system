// pipeline {
//     agent none 
//     stages {
//         stage('Docker Build') {
//             agent { docker 'node:14.16.1-alpine' } 
//             steps {
//                 echo 'Hello, Maven'
//                 sh 'npm i sqlite3 -D && rm -rf node_modules && npm i && npm rebuild'
//             }
//         }
//     }
// }
pipeline {
    agent {
        dockerfile {
            args '-t aman/ums:latest'
        }
    }
    environment {
        DOCKERHUB_CREDENTIALS=credentials('dockerhub-creds')
    }
    stages {
        stage('Test') { 
            steps {
                sh 'npm run test' 
            }
        }
    }
}
