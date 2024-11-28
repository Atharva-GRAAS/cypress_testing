pipeline{

    agent any

    parameters{
        string(name: 'SPEC_FILE', defaultValue: "cypress/e2e/**/**", description: "Enter the path of the spec to execute")
        choice(name: 'DEVICE', choices:['Desktop', 'Mobile'], description: "Choose the device to execute the test on")
        choice(name: 'BROWSER', choices: ['Chrome', 'Firefox'], description: "Choose the browser for execute the tests")
    }

    environment {
        CYPRESS_CACHE_FOLDER = '/var/lib/jenkins/.cache/Cypress' // Specify the Cypress cache path
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
                npm install 
                # Set environment variable for Cypress cache
                export CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}
                        
                # Install Cypress
                npx cypress install 
                '''
            }
        }
        stage('Testing'){
            steps{
                script {
                    // Define default viewport sizes
                    def viewportWidth = 1280
                    def viewportHeight = 720
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