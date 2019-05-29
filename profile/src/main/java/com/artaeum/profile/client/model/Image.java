package com.artaeum.profile.client.model;

public class Image {

    private String file;

    private String name;

    public Image() {}

    public Image(String file, String name) {
        this.file = file;
        this.name = name;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
