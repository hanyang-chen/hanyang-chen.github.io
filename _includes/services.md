<h2 style="margin: 60px 0px 10px;">Services</h2>

<div class="cv-section">
  <div class="cv-section-title">Conference Reviewer</div>
  <ul class="cv-list">
  {% for reviewer in site.data.services.reviewers %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">
          <a href="{{ reviewer.url }}">{{ reviewer.name }}</a>
        </div>
      </div>
      <div class="cv-item-right">{{ reviewer.year }}</div>
    </li>
  {% endfor %}
  </ul>
</div>

<div class="cv-section">
  <div class="cv-section-title">Teaching Assistant</div>
  <ul class="cv-list">
  {% for t in site.data.services.teaching %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">{{ t.course }}</div>
      </div>
      <div class="cv-item-right">{{ t.semesters }}</div>
    </li>
  {% endfor %}
  </ul>
</div>
