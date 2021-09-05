function executeWindows(files) {
  throw new Error("Not Implemented Yet")
}

function executeLinux(files) {
  return `rm -rf ${files.join(" ")}`
}

module.exports = {
  name: "plugin-clean-project",
  factory: require => {
    const shell = require("@yarnpkg/shell")
    const { Command, Option } = require("clipanion")
    const path = require("path")
    const os = require("os")

    const { Configuration, Project } = require("@yarnpkg/core")
  
    const isWindows = os.platform() === "win32"
    // const isLinux = os.platform() === "linux"

    const shellExecute = shell.execute
    
    class CleanCommand extends Command {
      static paths = [["clean"]]

      files = Option.Array("--files", { "description": "Override default path files to clean", required: false })

      async execute() {
        const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
        const { workspace } = await Project.find(configuration, this.context.cwd)
        const defaultFiles = workspace.manifest.raw.config?.clean ?? []
        const overrideFiles = this.files

        const toDelete = Array.isArray(overrideFiles) && overrideFiles.length ? overrideFiles : defaultFiles
        
        await shellExecute(isWindows ? executeWindows(toDelete) : executeLinux(toDelete))
        this.context.stdout.write("Clean repository default workspace\n")
      }
    }

    return {
      commands: [
        CleanCommand
      ]
    }
  }
}