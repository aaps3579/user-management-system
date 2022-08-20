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
        dockerfile true
    }
    environment {
        CI = 'true' 
        HOME = '.'
    }
    stages {
        stage('Test') { 
            steps {
                sh 'npm run test' 
            }
        }
    }
}
