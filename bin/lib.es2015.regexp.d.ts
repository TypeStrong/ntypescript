/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/// <reference no-default-lib="true"/>
interface RegExp {
    /**
      * Returns a string indicating the flags of the regular expression in question. This field is read-only.
      * The characters in this string are sequenced and concatenated in the following order:
      *
      *    - "g" for global
      *    - "i" for ignoreCase
      *    - "m" for multiline
      *    - "u" for unicode
      *    - "y" for sticky
      *
      * If no flags are set, the value is the empty string.
      */
    readonly flags: string;

    /** 
      * Returns a Boolean value indicating the state of the sticky flag (y) used with a regular 
      * expression. Default is false. Read-only. 
      */
    readonly sticky: boolean;

    /** 
      * Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular 
      * expression. Default is false. Read-only. 
      */
    readonly unicode: boolean;
}
