<h2 id="publications" class="pub-section-title" >Publications <span class="pub-ext-links"><a href="https://scholar.google.com/citations?user=_xGaoJ8AAAAJ" target="_blank">Google Scholar</a></span></h2>

{% assign preprints = site.data.preprints.main | default: empty %}
{% if preprints.size > 0 %}
<h3 class="pub-subsection" style="margin: 30px 0px -30px;">Preprints</h3>


<div class="publications">
<ol class="bibliography">

{% for link in preprints %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1">
            <abbr class="badge" data-venue="{{ link.conference_short }}">{{ link.conference_short }}</abbr>
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
    <div class="links">
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %} 
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.data %} 
      <a href="{{ link.data }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Dataset</a>
      {% endif %}
      {% if link.bibtex %}
        {% assign b = link.bibtex | strip %}
        {% if b contains 'http' %}
        <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
        {% else %}
        <a href="javascript:void(0);" class="btn btn-sm z-depth-0" onclick="toggleBibtex(this)" style="font-size:12px;">BibTex</a>
        <div class="bibtex-box">
          <div class="bibtex-inner">
            <div class="bibtex-header">
              <span>BibTeX</span>
              <button class="copy-btn" onclick="copyBibtex(this)">Copy</button>
            </div>
            <pre class="bibtex-content">{{ link.bibtex | strip }}</pre>
          </div>
        </div>
        {% endif %}
      {% endif %}
      {% if link.notes %}
      <strong> <i style="color:#e74d3c; font-weight:600">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %}
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>


{% endfor %}

</ol>
</div>
{% endif %}



{% assign publications = site.data.publications.main | default: empty %}
{% if publications.size > 0 %}
<h3 class="pub-subsection" style="margin: 35px 0px -30px;">Publications</h3>


<div class="publications">
<ol class="bibliography">

{% for link in publications %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1">
            <abbr class="badge">{{ link.conference_short }}</abbr>
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
    <div class="links">
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %} 
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.data %} 
      <a href="{{ link.data }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Dataset</a>
      {% endif %}
      {% if link.bibtex %}
        {% assign b = link.bibtex | strip %}
        {% if b contains 'http' %}
        <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
        {% else %}
        <a href="javascript:void(0);" class="btn btn-sm z-depth-0" onclick="toggleBibtex(this)" style="font-size:12px;">BibTex</a>
        <div class="bibtex-box">
          <div class="bibtex-inner">
            <div class="bibtex-header">
              <span>BibTeX</span>
              <button class="copy-btn" onclick="copyBibtex(this)">Copy</button>
            </div>
            <pre class="bibtex-content">{{ link.bibtex | strip }}</pre>
          </div>
        </div>
        {% endif %}
      {% endif %}
      {% if link.notes %}
      <strong> <i style="color:#e74d3c; font-weight:600">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %}
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>

{% endfor %}

</ol>
</div>
{% endif %}
