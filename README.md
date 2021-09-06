# nginx-configure
Well another nginx tool to manage nginx instances in another way.

## Developer
### How to clean your code

<br />

To delete your files, you need to provide a path on package.json. The code tag "clean" asked for an array, be default, it is empty an empty array.

For now, it's working only on linux.

<span style="background-color: green;">&ensp;FUTUR :&ensp;</span> It will integrate Windows-Dos and Windows-Powershell detection (Windows-Support)

```json
// package.json
{
  "name": "your-json-package",
  "version": "1.0.0",
  "clean": ["dir-to-remove-1", "dir-to-remove-2", "dir-to-remove-3", ...]
}
```

```bash
# Default use (will use clean propery on package.json)
yarn clean

# With optional path, it will override any parameters on package.json
yarn clean -files "YOUR PATH"
```

## Description Directory
### Directory Tools
* yarn.delete.js: plugins clean for yarn to delete files by default (detect windows and linux) / For now Linux-only => NEVER TOUCH IT, thx
