pipeline{

    agent any

    parameters{
        string(name: 'SPEC_FILE', defaultValue: "cypress/e2e/**/**", description: "Enter the path of the spec to execute")
        choice(name: 'DEVICE', choice:['Desktop', 'Mobile'], description: "Choose the device to execute the test on")
        choice(name: 'BROWSER', choice: ['Chrome', 'Firefox'], description: "Choose the browser for execute the tests")
    }

    options{
        ansiColor('xterm')
    }

    stages{
        stage('Building'){
            steps{
                echo "Building the application"
            }
        }

        stage('Testing'){
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

            steps{
                sh 'npm i'
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