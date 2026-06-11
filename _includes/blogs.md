<h2 style="margin: 60px 0px 10px;">Blogs</h2>

{% if site.posts.size == 0 %}

<p style="color: #777; font-style: italic; margin-top: 20px;">Coming soon...</p>

{% else %}

<div class="cv-section">
  <ul class="cv-list">
  {% for post in site.posts %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </div>
        <div class="cv-item-sub">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
      </div>
      <div class="cv-item-right">{{ post.date | date: "%b %d, %Y" }}</div>
    </li>
  {% endfor %}
  </ul>
</div>

{% endif %}
