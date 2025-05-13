//
//  DynamicIslandModule.swift
//  trips
//
//  Created by Platform Claims on 13/05/2025.
//

import ActivityKit

@objc(DynamicIslandModule)
class DynamicIslandModule: NSObject {
  
  @objc(testFunc: withMessage: withResolve: withReject:)
  func testFunc(title: NSString, message: NSString, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    print("This is a Swift Module!")
    resolve("\(title) --- \(message)")
  }
  
  @objc
  func startNotificationActivity() {
    let initialContentState = NotificationAttributes.ContentState(message: "נסיעה פעילה - לא לשכוח לסגור את הביטוח בסוף הנסיעה")
    let activityAttributes = NotificationAttributes(title: "הפניקס צעיר")
    
    do {
      if #available(iOS 16.1, *) {
        _ = try Activity.request(attributes: activityAttributes, contentState: initialContentState)
      } else {
        print("Not support dynamic island")
        // Fallback on earlier versions
      }
      print("Requested a motification Live Activity.")
    } catch (let error) {
      print("Error requesting motification delivery Live Activity \(error.localizedDescription).")
    }
  }
  
  @objc(updateNotificationActivity:)
  func updateNotificationActivity(message: String) {
    let initialContentState = NotificationAttributes.ContentState(message: message)
    if #available(iOS 16.1, *) {

      let alertConfiguration = AlertConfiguration(title: "Notification Update", body: "Notification update.", sound: .default)
      
      Task {
        for activity in Activity<NotificationAttributes>.activities {
          await activity.update(using: initialContentState, alertConfiguration: alertConfiguration)
        }
      }
    } else {
      // Fallback on earlier versions
    }
  }
  
  @objc
  func endNotificationActivity() {
    let notificationStatus = NotificationAttributes.NotificationStatus(message: "Close!")
    
    Task {
      if #available(iOS 16.1, *) {
        for activity in Activity<NotificationAttributes>.activities {
          await activity.end(using: notificationStatus, dismissalPolicy: .immediate)
        }
      } else {
        // Fallback on earlier versions
      }
    }
  }
}
