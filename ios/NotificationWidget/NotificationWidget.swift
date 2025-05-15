//
//  NotificationWidget.swift
//  NotificationWidget
//
//  Created by Platform Claims on 13/05/2025.
//

import WidgetKit
import SwiftUI


@main
struct NotificationWidgets: WidgetBundle {
  var body: some Widget {
    
    if #available(iOS 16.1, *) {
      WidgetNotification()
    }
  }
}

struct LockScreenView: View {
  let context: ActivityViewContext<NotificationAttributes>
  var body: some View {
    VStack(alignment: .center) {
      ContentView(context: context)
    }.padding()
  }
}

struct HeaderView: View {
  let context: ActivityViewContext<NotificationAttributes>
  var body: some View {
    HStack(alignment: .center) {
      Link(destination: URL(string: "trips://end_drive")!, label: {
        HStack(spacing: 5) {
          Image(systemName: "stop.circle")
            .foregroundColor(.white)
          Text("סיום נסיעה").font(.caption)
            .bold().background(Color(red: 1.0, green: 90/255, blue: 35/255))
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(Color(red: 1.0, green: 90/255, blue: 35/255))
        .clipShape(Capsule())
        .foregroundColor(.white)
      })
      Spacer()
      VStack(alignment: .trailing) {
        Text(context.attributes.title).font(.subheadline).bold()
        Text(context.state.message).font(.subheadline)
      }
      Image(systemName: "car.fill")
          .font(.system(size: 30))
          .foregroundColor(Color(red: 1.0, green: 90/255, blue: 35/255))
    }
  }
}

struct ContentView: View {
  let context: ActivityViewContext<NotificationAttributes>
  var body: some View {
    HeaderView(context: context)
  }
}

struct WidgetNotification: Widget {
  
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: NotificationAttributes.self) { context in
      // Create the view that appears on the Lock Screen and as a
      // banner on the Home Screen of devices that don't support the
      // Dynamic Island.
      LockScreenView(context: context)
    } dynamicIsland: { context in
      // Create the views that appear in the Dynamic Island.
      DynamicIsland {
        // Create the expanded view.
        DynamicIslandExpandedRegion(.leading) {
          // Text("test")
        }
        
        DynamicIslandExpandedRegion(.trailing) {
          // Text("test")
        }
        
        DynamicIslandExpandedRegion(.center) {
          HStack {
            Text(context.attributes.title).font(.subheadline)
            Image(systemName: "car.fill")
                .font(.system(size: 24))
                .foregroundColor(Color(red: 1.0, green: 90/255, blue: 35/255))
          }
          
        }
        
        DynamicIslandExpandedRegion(.bottom) {
          Link(destination: URL(string: "trips://end_drive")!, label: {
            HStack(spacing: 5) {
              Image(systemName: "stop.circle")
                .foregroundColor(.white)
              Text("סיום נסיעה").font(.caption)
                .bold().background(Color(red: 1.0, green: 90/255, blue: 35/255))
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 8)
            .background(Color(red: 1.0, green: 90/255, blue: 35/255))
            .clipShape(Capsule())
            .foregroundColor(.white)
          })
        }
      } compactLeading: {
        // Create the compact leading view.
        // Text("test")
        
      } compactTrailing: {
        // Create the compact trailing view.
        Image(systemName: "car.fill")

      } minimal: {
        // Create the minimal view.
        // Text("test")
      }
      .keylineTint(.yellow)
    }
  }
}

//struct WidgetNotification_Previews: PreviewProvider {
//  static var previews: some View {
//    Text("Test")
//  }
//}

