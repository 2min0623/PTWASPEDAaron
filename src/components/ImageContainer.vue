<template>
  <div id="ImageContainer" ref="ImageContainer" class="image-container">
    <!-- 圖片 -->
    <img
      v-if="componentConfig.Type !== 'video'"
      id="Img"
      ref="Image"
      :src="imageUrl"
      :alt="componentConfig.Alt"
    />

    <!-- 影片 -->
    <video
      v-else
      id="Video"
      ref="Video"
      :src="imageUrl"
      :controls="componentConfig.Controls ?? true"
      :autoplay="componentConfig.Autoplay ?? false"
      :loop="componentConfig.Loop ?? false"
      :muted="componentConfig.Muted ?? false"
      :playsinline="componentConfig.Playsinline ?? true"
    >
      您的瀏覽器不支援影片播放。
    </video>
  </div>
</template>

<script>
import { getGameAssets } from "@/lib/get-assets.js";

export default {
  name: "ImageContainer",
  props: {
    gameId: {
      type: String,
      required: true,
    },
    componentConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  mounted() {
    this.imageUrl = getGameAssets(this.gameId, this.componentConfig.Src);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

img,
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
}
</style>
