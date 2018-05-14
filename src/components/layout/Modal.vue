<template>
    <transition name="v-modal-fade">
    <div class="v-modal-backdrop">
      <div class="v-modal"
        role="dialog"
        aria-labelledby="v-modalTitle"
        aria-describedby="v-modalDescription">
        <header
          class="v-modal-header"
          id="v-modalTitle">
          <slot name="header">
            <h2>{{ title }}</h2>

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal">
              <i class="fas fa-times"></i>
            </button>
          </slot>
        </header>
        <section
          class="v-modal-body"
          id="v-modalDescription">
          <slot name="body">
            <p>{{ message }}</p>
          </slot>
        </section>
        <footer class="v-modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="close"
              aria-label="Close modal">
              {{ $t('modal.close') }}
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'modal',
})
export default class Modal extends Vue {

 @Prop() public title: string;
 @Prop() public message: string;

  public close(): void {
    this.$emit('close');
  }

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  .v-modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }

  .v-modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 200px;
  }

  .v-modal-header,
  .v-modal-footer {
    padding: 15px;
    display: flex;
  }

  .v-modal-header {
    border-bottom: 1px solid $gray-200;
    color: $primary;
    justify-content: space-between;
  }

  .v-modal-footer {
    border-top: 1px solid $gray-200;
    justify-content: flex-end;

    button {
      margin-left: 15px;
      min-width: 100px;

      svg {
        margin-right: 5px;
      }
    }
  }

  .v-modal-body {
    position: relative;
    padding: 30px 15px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: $primary;
    background: transparent;
  }

  .v-modal-fade-enter,
  .v-modal-fade-leave-active {
    opacity: 0;
  }

  .v-modal-fade-enter-active,
  .v-modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
