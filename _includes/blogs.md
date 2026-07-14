<h2 style="margin: 60px 0px 10px;">Blogs</h2>

{% if site.blogs.size == 0 %}

<p style="color: #777; font-style: italic; margin-top: 20px;">Coming soon...</p>

{% else %}

<div class="cv-section">
  <ul class="cv-list">
  {% assign sorted_blogs = site.blogs | sort: 'date' | reverse %}
  {% for post in sorted_blogs %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </div>
        {% if post.venue or post.authors %}
        <div class="cv-item-meta" style="color: #777; margin: 2px 0 4px;">
          {% if post.venue %}{{ post.venue }}{% endif %}
          {% if post.venue and post.authors %}&nbsp;&nbsp;|&nbsp;&nbsp;{% endif %}
          {% if post.authors %}{{ post.authors }}{% endif %}
        </div>
        {% endif %}
        <div class="cv-item-sub">
          {% if post.summary %}
            {{ post.summary | strip_html }}
          {% elsif post.excerpt %}
            {{ post.excerpt | strip_html | truncatewords: 30 }}
          {% else %}
            {{ post.content | strip_html | truncatewords: 30 }}
          {% endif %}
        </div>
      </div>
      <div class="cv-item-right">{{ post.date | date: "%b %d, %Y" }}</div>
    </li>
  {% endfor %}
  </ul>
</div>

{% endif %}
