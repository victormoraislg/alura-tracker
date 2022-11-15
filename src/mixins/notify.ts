import { NotificationType } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/actions";
import { store } from '@/store';

export const notifyMixin = {
  methods: {
    notify(type: NotificationType, title: string, text: string) : void {
      store.commit(NOTIFY, {
        title,
        text,
        type
      });
    }
  }
}