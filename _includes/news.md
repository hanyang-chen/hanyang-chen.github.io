<h1 style="margin: 40px 0px 10px;">News</h1>

{% for item in site.data.news.items %}
{% unless item.hidden %}
<div style="margin-bottom: 6px;"><strong>[{{ item.date }}]</strong> {{ item.content }}</div>
{% endunless %}
{% endfor %}
