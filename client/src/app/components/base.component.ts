import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

abstract class BaseComponent implements OnDestroy {
    public cleanup: Array<Subscription>;

    constructor () {
        this.cleanup = [];
    }

    public ngOnDestroy () {
        for (const obs of this.cleanup) {
            obs.unsubscribe();
        }
    }
}

export { BaseComponent };
