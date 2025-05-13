//
//  ActivityAttributes.swift
//  trips
//
//  Created by Platform Claims on 13/05/2025.
//

import Foundation
import ActivityKit

// Notification
struct NotificationAttributes: ActivityAttributes {
  public typealias NotificationStatus = ContentState
  
  public struct ContentState: Codable, Hashable {
    var message: String
  }
  
  var title: String
}

// Island
struct TripAttributes: ActivityAttributes {
  public typealias FoodOrderStatus = ContentState
  
  public struct ContentState: Codable, Hashable {
    var message: String
  }
  
  var title: String
  var image: String
}
