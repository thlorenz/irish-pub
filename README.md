# irish-pub [![build status](https://secure.travis-ci.org/thlorenz/irish-pub.svg)](http://travis-ci.org/thlorenz/irish-pub)

Feel like npm is drunk or maybe you are and want to verify what gets published via `npm publish`? **irish-pub** has you covered.

```sh
➝ irish-pub

npm will publish irish-pub@1.0.0 as thlorenz, including the following files:

package.json
.npmignore
README.md
LICENSE
index.js
.travis.yml
bin/irish-pub.js
test/index.js
test/foo/package.json
test/foo/.npmignore
test/foo/index.js
test/foo/example/first.js
test/foo/lib/work.js
```

## Installation

    npm install -g irish-pub

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="irishPub"><span class="type-signature"></span>irishPub<span class="signature">(root)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Invokes <code>npm pack</code> to determine what would be included during <code>npm publish</code>.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>root</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>path to package to publish, defaults to <code>cwd</code></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/irish-pub/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/irish-pub/blob/master/index.js#L12">lineno 12</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits all files with paths relative to <code>root</code> that will be packed via the <code>data</code> event</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
