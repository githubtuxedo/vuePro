import Vue from 'vue'
export default {
  name: 'App',
  render(h) {
    return (
        <div id="app" style='height:100%'>
            <router-view/>
        </div>
    );
  }
}