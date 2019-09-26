import { state, trigger, transition, animate, style } from '@angular/animations';

export const fade = trigger('fade', [
    state('void', style({
        opacity: 0
    })),
    state('*', style({
        opacity: '{{opacity}}'
    }), {
        params: { opacity: 1 }
    }),
    transition('void <=> *', [
        animate('{{duration}}')
    ], {
        params: { duration: '0.1s' }
    })
]);
