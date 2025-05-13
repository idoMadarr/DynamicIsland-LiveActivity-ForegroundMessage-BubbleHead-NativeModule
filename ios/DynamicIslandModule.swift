//
//  DynamicIslandModule.swift
//  trips
//
//  Created by Platform Claims on 13/05/2025.
//

@objc(DynamicIslandModule)
class DynamicIslandModule: NSObject {
  
  @objc(testFunc: withMessage: withResolve: withReject:)
  func testFunc(title: NSString, message: NSString, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    print("This is a Swift Module!")
    resolve("\(title) --- \(message)")
  }
}
