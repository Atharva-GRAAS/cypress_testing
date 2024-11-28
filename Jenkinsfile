pipeline {
    agent any

    parameters{
        string(name: 'SPEC_FILE', defaultValue: "cypress/e2e/**/**", description: "Enter the path of the spec to execute")
        choice(name: 'CONFIG_FILE', choices:['cypress.config.segulfm24.js', 'cypress.config.sehkm24.js'], description: "Choose the config file for the test to execute")
        choice(name: 'DEVICE', choices:['Desktop', 'Mobile'], description: "Choose the device to execute the test on")
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: "Choose the browser for execute the tests")
    }

    options {
        ansiColor('xterm')
    }

    environment {
        CYPRESS_CACHE_FOLDER = '/var/lib/jenkins/.cache/Cypress'
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Install required dependencies including Xvfb
                    sh '''
                        # Ensure Cypress cache directory exists
                        mkdir -p ${CYPRESS_CACHE_FOLDER}
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies and Cypress
                    sh '''
                        npm install
                        export CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}
                        npx cypress install
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Define viewport dimensions based on the device parameter
                    def viewportWidth = 1280
                    def viewportHeight = 720

                    if (params.DEVICE == 'Desktop') {
                        viewportWidth = 1920
                        viewportHeight = 1080
                    } else if (params.DEVICE == 'Mobile') {
                        viewportWidth = 375
                        viewportHeight = 667
                    }

                    // Run tests with Xvfb for headless display
                    sh """
                        export CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}
                        xvfb-run --auto-servernum -- npx cypress run \
                            --browser ${params.BROWSER} \
                            --spec "${params.SPEC_FILE}" \
                            --config viewportWidth=${viewportWidth},viewportHeight=${viewportHeight} \
                            --config-file ${params.CONFIG_FILE}
                    """
                }
            }
        }
    }

    post{
        always{
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
        }
    }
}
