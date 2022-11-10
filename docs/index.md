# Pomelo Note

This is the best open source note app you will ever find.

## Login
When first entering the app, you will need to login. If you haven't got an account you may consider [registering](#register), or just not using the app at all.
<br /><img src="images/login.png" width="50%" style="alignment: center;" />

## Register
A username, an email and a password that's all you need. If you are missing one of those, just don't use the app at all. 
<br /><img src="images/register.png" width="50%" style="alignment: center;" />

## Editor
You can edit your notes with our minimalistic editor interface.
<br /><img src="images/editor.png" width="50%" style="alignment: center;" />

## Listing
Here you can see all your notes. Click on them to open the editor or hover and press the red "X" to delete them.
<br /><img src="images/listing.png" width="50%" style="alignment: center;" />

## Delete
Confirm the deletion.
<br /><img src="images/delete.png" width="50%" style="alignment: center;" />

# The Team
{% for dev in site.data.devs %}
  {{ dev.name }}
  [GitHub](https://github.com/{{ dev.github }}) 
  ![{{ dev.name }}](images/{{ dev.image }}.jpg)
{% endfor %}

