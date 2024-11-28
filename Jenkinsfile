pipeline{

    agent any

    parameters{
        string(name: 'SPEC_FILE', defaultValue: "cypress/e2e/**/**", description: "Enter the path of the spec to execute")
        choice(name: 'DEVICE', choices:['Desktop', 'Mobile'], description: "Choose the device to execute the test on")
        choice(name: 'BROWSER', choices: ['Chrome', 'Firefox'], description: "Choose the browser for execute the tests")
    }

    stages{
        stage('Building'){
            steps{
                echo "Building the application"
            }
        }

        stage('Setup Dependencies') {
            steps {
                // Install Node.js dependencies
                sh '''
                    sudo apt-get update
                    sudo apt-get install -y nodejs
                    npm install
                '''
            }
        }
        stage('Testing'){
            steps{
                script {
                    // Conditional logic for viewport based on device selection
                    if (params.DEVICE == 'Desktop') {
                        viewportWidth = 1920
                        viewportHeight = 1080
                    } else if (params.DEVICE == 'Mobile') {
                        viewportWidth = 900
                        viewportHeight = 500
                    }
                }

                sh 'npx cypress run --browser ${BROWSER} --spec ${SPEC_FILE} --config viewportWidth=${viewportWidth},viewportHeight=${viewportHeight}'
            }
        }
        stage('Deploying'){
            steps{
                echo "Run deployed"
            }
        }

    }
}