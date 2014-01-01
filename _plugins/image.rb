module Jekyll
  class ImageTag < Liquid::Tag
    @url = nil
    @caption = nil
    @class = nil

    IMAGE_URL_WITH_CLASS_AND_CAPTION = /(\w+)(\s+)((https?:\/\/|\/)(\S+))(\s+)"(.*?)"/i
    IMAGE_URL_WITH_CAPTION = /((https?:\/\/|\/)(\S+))(\s+)"(.*?)"/i
    IMAGE_URL_WITH_CLASS = /(\w+)(\s+)((https?:\/\/|\/)(\S+))/i
    IMAGE_URL = /((https?:\/\/|\/)(\S+))/i

    def initialize(tag_name, markup, tokens)
      super

      if markup =~ IMAGE_URL_WITH_CLASS_AND_CAPTION
        @class   = $1
        @url     = $3
        @caption = $7
      elsif markup =~ IMAGE_URL_WITH_CAPTION
        @url     = $1
        @caption = $5
      elsif markup =~ IMAGE_URL_WITH_CLASS
        @class = $1
        @url   = $3
      elsif markup =~ IMAGE_URL
        @url = $1
      end
    end

    def render(context)
      if @class
        if @class == 'breakout'
          source = "</div><figure class='#{@class}'>"
        else
          source = "<figure class='#{@class}'>"
        end
      else
        source = "<figure>"
      end

      source += "<img src=\"#{@url}\">"
      source += "<figcaption>#{@caption}</figcaption>" if @caption
      source += "</figure>"

      if @class == 'breakout'
        source += "<div class='entry-content wrap'>"
      end

      source
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)