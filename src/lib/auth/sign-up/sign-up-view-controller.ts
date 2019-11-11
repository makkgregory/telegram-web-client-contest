/*
 * Copyright 2019 Grigory Makarov <makkgregory@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ViewController} from "@telegram/uikit";
import {SignUpView} from "./sign-up-view";
import {ProfilePhotoPickerController} from "../common/profile-photo-picker/profile-photo-picker-controller";
import {map, takeUntil} from "rxjs/operators";

export interface SignUpViewControllerDelegate {
    userDidSignUp(): void;
}

export class SignUpViewController extends ViewController<SignUpView> {
    private readonly profilePhotoPickerController = new ProfilePhotoPickerController();

    constructor(private readonly delegate: SignUpViewControllerDelegate) {
        super();
    }

    public createView(): SignUpView {
        return new SignUpView(this.profilePhotoPickerController.view);
    }

    public viewWillAppear() {
        super.viewWillAppear();

        this.view.completeButton.tap$.pipe(
            map(() => this.delegate.userDidSignUp()),
            takeUntil(this.viewDidDisappear$)
        ).subscribe();
    }
}
