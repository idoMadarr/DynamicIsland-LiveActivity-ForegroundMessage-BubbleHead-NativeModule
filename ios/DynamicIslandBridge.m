//
//  DynamicIslandBridge.m
//  trips
//
//  Created by Platform Claims on 13/05/2025.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DynamicIslandModule, NSObject)

RCT_EXTERN_METHOD(testFunc: (NSString) title withMessage:(NSString) message withResolve:(RCTPromiseResolveBlock) resolve withReject:(RCTPromiseRejectBlock) reject)

@end
