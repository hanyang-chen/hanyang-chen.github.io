# yaoyao-liu.github.io

[![LICENSE](https://img.shields.io/github/license/yaoyao-liu/homepage?style=flat-square&logo=creative-commons&color=EF9421)](https://github.com/yaoyao-liu/homepage/blob/main/LICENSE)

This is the latest version of [my homepage](https://yaoyaoliu.csl.illinois.edu/)'s source code. Feel free to use and share.
<br />
For more details, please refer to this repository: <https://github.com/yaoyao-liu/minimal-light>.

### Using Locally with Jekyll

This repository supports a project-local Ruby 3.3 environment on WSL/Linux.
Miniconda or Miniforge is required for the initial setup. The environment is
accessed through `.tools/runtime/`; no system-wide Ruby installation is needed.
On case-insensitive Windows mounts, this directory links to a project-specific
environment under `~/.local/share/jekyll-envs/` in the WSL Linux filesystem,
so Linux compiler headers retain their distinct uppercase/lowercase filenames.

First-time setup (requires internet access):

```bash
bash scripts/setup.sh
```

Start the local preview:

```bash
bash scripts/serve.sh
```

Open <http://localhost:4000>. Changes are detected using polling so edits from
Windows editors work on WSL-mounted folders. Press Ctrl+C to stop the server.
To use another port, run `bash scripts/serve.sh --port 4001`.

Build the site without starting a server:

```bash
bash scripts/build.sh
```

Generated HTML is written to `_site/`. To run Ruby/Bundler commands directly
in your current Bash terminal:

```bash
source scripts/env.sh
bundle exec jekyll doctor
```

The environment is declared in `environment.yml`. `.tools/` and `.bundle/`
contain local dependencies/settings and are ignored by Git.
The Google Scholar crawler is separate and is not required to preview the site.

### Using the HTML version

The compiled HTML files are available in the [`html_source_file`](https://github.com/yaoyao-liu/homepage/tree/main/html_source_file) folder. If you don't like Jekyll, you may directly edit and use the HTML version.

### Google Scholar Crawler

The instructions for the Google Scholar crawler can be found in [this repository](https://github.com/RayeRen/acad-homepage.github.io).
<br>
Before using that, you need to change the Google Scholar ID in the following file:
https://github.com/yaoyao-liu/homepage/blob/bf1cdb984e6189b855797a88d8a36d194c1e4901/google_scholar_crawler/main.py#L7


### Acknowledgements

This project uses the source code from the following repositories:

* [pages-themes/minimal](https://github.com/pages-themes/minimal)

* [orderedlist/minimal](https://github.com/orderedlist/minimal)

* [al-folio](https://github.com/alshedivat/al-folio)

* [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io)
