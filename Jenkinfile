pipeline{
    agent any
    environment {
        SONAR_HOME= tool "sonar"
    }
    stages{
        stage("cloning"){
            steps{
                echo "cloning code from github ....."
                git branch: 'main' , url: 'https://github.com/nitin-panwar-6963/milky-macron-bakery.git'
                echo "successfully code clone ......"
            }
        }
        stage("quality anaysis by sonarqube"){
            steps{
                withSonarQubeEnv("sonar"){
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=milky-macron -Dsonar.projectKey=bakery"
                }
            }
        }
        stage("build"){
            steps{
            echo "create docker image..."
            sh " docker build -t bakery . "
            echo "successfully created image ....."
        }
    }
    stage("deploy"){
        steps{
            sh "docker run -p 100:80 bakery"
        }
    }
    }
}
