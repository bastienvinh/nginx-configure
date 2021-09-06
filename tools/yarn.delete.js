function executeWindows(files) {
  // TODO: Detect Dos or Powershell
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
    const os = require("os")

    const { Configuration, Project } = require("@yarnpkg/core")
  
    const isWindows = os.platform() === "win32"
    const shellExecute = shell.execute
    
    class CleanCommand extends Command {
      static paths = [["clean"]]

      static usage = {
        category: "Utilities",
        description: "Clean your current workspace, delete by force all directories or files defined in the current package.json",
        details: `
          Clean your current workspace, delete by force all directories or files defined in the current package.json
          \`\`\`json
          # package.json
          {
            "name": "your project",
            ...
            "clean": ["glob-paths-1", "directory", "file", ...],
          }
          \`\`\`
        `,
        examples: [["Default Usage", "$0 clean"], ["With Parameters", "$0 clean --files path-one,path2,file --files file1"]]
      }

      files = Option.Array("--files", { "description": "Override default path files to clean", required: false })
      displayVersion = Option.Boolean("--version")

      async execute() {
        const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
        const { workspace } = await Project.find(configuration, this.context.cwd)
        const defaultFiles = workspace.manifest.raw.clean ?? []
        const overrideFiles = this.files

        // manage version options
        if (this.displayVersion && this.files?.length) {
          await shellExecute(`echo "Bad arguments"`)
          return
        }
        else if (this.displayVersion) {
          await shellExecute(`echo "1.0.0"`)
          return
        }

        // Execute default code
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