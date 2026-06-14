<template>
  <div class="repeat-image-container" :style="containerStyle" ref="container">
    <img
      v-for="index in count"
      :key="index"
      :src="imageUrl"
      :alt="componentConfig.Alt"
      class="repeated-image"
      :style="imageStyle"
    />
  </div>
</template>

<script>
import { getGameAssets } from "@/lib/get-assets.js";
export default {
  name: "RepeatImage",
  props: {
    componentConfig: {
      type: Object,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      count: this.componentConfig.Count,
      imageUrl: getGameAssets(this.gameId, this.componentConfig.Src),
      columns: 0,
      imageSize: 80,
      containerWidth: 0,
      containerHeight: 0,
    };
  },
  computed: {
    effectiveColumns() {
      return Math.min(this.calculateColumns(), this.count);
    },
    effectiveRows() {
      return Math.ceil(this.count / this.effectiveColumns);
    },
    containerStyle() {
      return {
        gridTemplateColumns: `repeat(${this.effectiveColumns}, 1fr)`,
      };
    },
    imageStyle() {
      return {
        width: `${this.imageSize}px`,
        height: `${this.imageSize}px`,
      };
    },
  },
  mounted() {
    this.calculateOptimalSize();
    window.addEventListener("resize", this.calculateOptimalSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calculateOptimalSize);
  },
  methods: {
    calculateColumns() {
      if (this.componentConfig.Columns) {
        return this.componentConfig.Columns;
      }
      for (let i = 1; i <= 10; i++) {
        if (this.count / i <= 10) {
          return Math.ceil(this.count / i);
        }
      }
      return 10;
    },
    calculateOptimalSize() {
      if (!this.$refs.container) return;

      const container = this.$refs.container;
      const maxWidth = container.offsetWidth || window.innerWidth * 0.9;
      const maxHeight = 300; // 限制最大高度

      const gap = 8; // gap 的大小（$gap--tiny）
      const padding = 16; // padding 的大小（$padding--small）

      // 計算可用空間
      const availableWidth = maxWidth - padding * 2 - (this.effectiveColumns - 1) * gap;
      const availableHeight = maxHeight - padding * 2 - (this.effectiveRows - 1) * gap;

      // 根據寬度和高度計算最優的圖片大小
      const sizeByWidth = Math.floor(availableWidth / this.effectiveColumns);
      const sizeByHeight = Math.floor(availableHeight / this.effectiveRows);

      // 取較小的值以確保不超出容器
      this.imageSize = Math.min(sizeByWidth, sizeByHeight, 200); // 最大限制200px
      this.imageSize = Math.max(this.imageSize, 40); // 最小限制40px
    },
  },
};
</script>

<style scoped lang="scss">
.repeat-image-container {
  display: grid;
  width: 100%;
  height: auto;
  max-height: 300px;
  padding: $padding--small;
  box-sizing: border-box;
  gap: $gap--tiny;
  place-items: center;
  overflow: hidden;
}

.repeated-image {
  min-width: 0;
  min-height: 0;
  object-fit: contain;
}
</style>
