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
        docker { 
            image 'node:16.13.1-alpine' 
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
