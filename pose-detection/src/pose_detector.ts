/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import {EstimationConfig, ModelConfig, Pose, PoseDetectorInput} from './types';

/**
 * User-facing interface for all pose detectors.
 */
export interface PoseDetector {
  /**
   * Estimate poses for an image or video frame.
   * @param image An image or video frame.
   * @param config See `EstimationConfig` for available options.
   * @returns An array of poses, each pose contains an array of `Keypoint`s.
   */
  estimatePoses(image: PoseDetectorInput, config?: EstimationConfig):
      Promise<Pose[]>;
}

/**
 * Internal interface for all pose detectors to create instance and load
 * models.
 */
export abstract class BasePoseDetector implements PoseDetector {
  constructor() {}

  /**
   * Initiate class instance and async load the model.
   */
  static async load(modelConfig: ModelConfig = {}): Promise<PoseDetector> {
    const detector = this.constructor();
    return detector;
  }

  abstract async estimatePoses(
      image: PoseDetectorInput, config?: EstimationConfig): Promise<Pose[]>;
}
