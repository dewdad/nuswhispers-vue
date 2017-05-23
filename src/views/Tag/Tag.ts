import Vue from 'vue';
import { Route } from 'vue-router';
import ASyncComponent, { InitialDataProps } from '../../components/ASyncComponent';
import List from '../../components/List/index.vue';
import meta from '../../mixins/meta';
import title from '../../mixins/title';
import { Store } from '../../store';
import { Confession } from '../../store/state';

@ASyncComponent({
  components: {
    List,
  },
  mixins: [meta, title],
})
export default class Tag extends Vue {
  public loading: boolean = false;

  get items(): Confession[] {
    return this.$store.getters.listByTag(this.$route.params.id);
  }

  public beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    // Fetch data if tag ID is different from the previous one.
    if (to.params.id !== from.params.id) {
      return this.fetchInitialData({ store: this.$store, route: to }).then(() => next());
    }
    next();
  }

  public fetchInitialData({ store, route }: InitialDataProps): Promise<any> {
    this.loading = true;
    return store.dispatch('getByTag', route.params.id).then(() => this.loading = false);
  }

  public fetchMore() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.$store.dispatch('getNextByTag', this.$route.params.id).then(() => this.loading = false);
  }

  public title(): string {
    return `#${this.$route.params.id} - NUSWhispers`;
  }
}
