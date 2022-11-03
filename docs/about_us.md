## Our Dev Team
{% for dev in site.data.devs %}
### {{ dev.name }}
 - [GitHub](https://github.com/{{ dev.github }})
 ![{{ dev.name }}](images/{{ dev.image }}.jpg)
{% endfor %}