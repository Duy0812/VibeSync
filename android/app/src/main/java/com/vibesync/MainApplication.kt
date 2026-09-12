package com.vibesync

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  // 1. Tự tay xây lại trạm phát sóng cũ cho thư viện phát nhạc
  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this@MainApplication) {
          override fun getPackages(): List<ReactPackage> =
              // Dùng this@MainApplication để Kotlin không bị nhầm lẫn
              PackageList(this@MainApplication).packages.apply {
              }

          override fun getJSMainModuleName(): String = "index"
          override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
          override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
          override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  // 2. Trạm phát sóng mới mặc định của React Native
  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = this@MainApplication,
      packageList = PackageList(this@MainApplication).packages.apply {
      },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this@MainApplication)
  }
}