<h2 id="projects" class="pub-section-title">Projects</h2>

{% assign projects = site.data.projects.main | default: empty %}
{% if projects.size > 0 %}

<div class="publications">
<ol class="bibliography">

{% for link in projects %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr project-media" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.video %}
    <video src="{{ link.video }}" class="teaser" autoplay muted loop playsinline preload="metadata"{% if link.image %} poster="{{ link.image }}"{% endif %}></video>
    {% elsif link.image %}
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1">
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title">
        {% if link.page %}
        <a href="{{ link.page }}" target="_blank">{{ link.title }}</a>
        {% else %}
        {{ link.title }}
        {% endif %}
      </div>
      {% if link.year or link.tags %}
      <div class="periodical">
        {% if link.year %}
        <strong>{{ link.year }}</strong>
        {% endif %}
        {% if link.tags %}
        <span class="project-tags">
        {% for tag in link.tags %}
        <span class="project-tag">{{ tag }}</span>
        {% endfor %}
        </span>
        {% endif %}
      </div>
      {% endif %}
      <div class="project-description">{{ link.description }}</div>
    <div class="links">
      {% if link.page %}
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.code %}
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.pdf %}
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
    </div>
  </div>
</div>
</li>

{% endfor %}

</ol>
</div>
{% endif %}
