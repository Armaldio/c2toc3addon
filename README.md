# C2 addon to C3 converter

## Usage

```bash
Usage: c2toc3 [options]

  Convert a C2 addon to a C3 one

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -a, --addon [addon]       Use .c2addon file as input
    -f, --folder [addon]      Use addon folder as input
    -z, --zip [addon]         Use zip file as source
    -d, --destination [path]  Where to export .c3addon file
```

## Examples

Convert folder **[myPlugin]** to **[./name.c3addon]**
```bash
c2toc3 -f myPlugin
```

Convert folder **[myPlugin]** to **[../exported/name.c3addon]**
```bash
c2toc3 -f myPlugin -d ../exported
```

Convert .c2addon file **[myPlugin.c2addon]** to **[./name.c3addon]**
```bash
c2toc3 -a myPlugin.c2addon
```

Convert zip file **[myPlugin.zip]** to **[./name.c3addon]**
```bash
c2toc3 -z myPlugin.zip
```

## Convert to
- [X] Folder
- [ ] C2Addon
- [ ] ZIP

## Export to
- [X] Export to folder
- [ ] Export to .c3addon


## TODO
- aces.json
- lang
