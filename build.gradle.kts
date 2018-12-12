import com.moowork.gradle.node.NodeExtension
import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("com.moowork.node") version "1.2.0"
}

node {
    version = "11.4.0"
    npmVersion = "6.5.0"
    download = true
}


tasks.register("startDevAdminServer", NpmTask::class) {
    dependsOn("npmInstall")
    group = "Application"
    setArgs(arrayListOf("run", "dev"))
}
