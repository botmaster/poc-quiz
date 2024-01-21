/* eslint-disable no-console */
import type { App } from 'vue';
import pkg from '../../package.json';

/**
 * Pretty console
 */

export default {
  install(app: App) {
    const titleStyles = [
      'color: #5E81AC',
      'font-size: 1.5rem',
      'font-weight: bold',
      'padding-bottom: 1rem',
      'padding-top: 1rem',
    ].join(';');

    console.log('%cLive long and prosper 🖖', titleStyles);

    console.log(
      '%c ',
      'font-size: 1px; padding: 60px 60px; background-size: 150px 119px; background: no-repeat url(data:image/webp;base64,UklGRoYMAABXRUJQVlA4WAoAAAAQAAAAlQAAdgAAQUxQSIACAAABoERb27G9uWPbdjLyOCsj27Zt2xzbtm3btu3Ubr+r+L73ed/nRjOMiAkgmWciYawXWbE+3JvkUa8OQv6k226EH7ujV0lErNV7RJ5VJfjYVqGYFzihzi54+r028FcX+KzJW6+gCPyupcY3nkEN+H5WiaPeQQn4f12FcgygAjjOMgoUGM0jt3xg+nWlonT5uEC6CUa5apTHbDIKd5nNFOEGsvletu1J2PwsGhj/KsW0ScL8JENyAJDlDptkQPIAiOuWkVM9LjkBIHdUxOlHLoibIGW8lykFgQiT4wGPbIGAVjlgFChXPtgKiVIwiQWDRMQyHSHuj5H9xYdYIvHKOF8iKM6GWP4WoGocBP7RobwqCPjdfzIHm+3QV6k//oPgix26ajIyCEL46JBVk5jLkEhIE7jA8bgMawRI4jJOBuKY1GW9SyWXWzzOsyjhAldy5kEsaxplpmfE4Rce1x3yRreEQV4e3zr8Eh0xIJ6/OsADKkb0hwKI5mMoRLREm+ROy8PK7VUaCX53KhsWeUUSuNP/luxGIZscFemMACTSZH6/y1SZH8mUid05oVKyI75boyG9IFofo5A2/cT7wb8qf2ImwdNMjOBbKXhNYqV1gt8k12qHJfA8q1wI9h2812E3/K8gV9IAW8BRLiQCTz55ovuJiMb+CrZs6kbHPwmP8fIB9Tms0wC44N9WHYDYN/n9mq/Ff5P41EoToJM/pAuAO0YBXhsFuGQUAMmNArw2CmAVNDUKEF5MOaQOC+ovDCeZflgSCixYOITqJkAIsOFzp11GgBOsmCNY8U9m+C4QLBkEX0EKJYItDyZ4ZQzEKw2bwCawZ3Mi+mIQEBFsAps8tMl3VlA4IOAJAADQLQCdASqWAHcAPpE+mkiloyKhKnTsALASCUAaJ4vyeziBgOYvS3tz+dn023orPWR/ylBcbQ96+1+aKDd5TyztMs/v3rGd7n649gzpAfun7Df60odjEt8yQz58bRnpnxltjW2xVc0MFHOcZWL4DkG3Llv8es/3fz4Wji+7IevnUiH5mKMxWfVXIeonffodH0/br6eAV4r3/N+74oe/mixUxyDDblFprHsr0evJYbsFMV3p1R6tD6PPkzUl9tX2RlqGH7I+3tszuQQ3eLFsB304Yz50aMUfL88QQuORoryYQ62vBhvU5iagP7Uid8wG759AAgqQJWdPq10d8BOwrD5zzfJBPFMf85UGklVFdtld93v7OIDL/wMQ7+ZsoezwxkWFW6Rx6C6NoriJSxVyznbGe6iiucESYfUMdC+BuoIKLCBeF7g7JQTkDCrz2hG/M2uMCdOqPAi8Z/MK68XUrxgip7MurG2a1oD5Nnsw4dHISFMQSHR9WIAA/vv9UFjU09/Qpv6d5PpRZJYqfqi1+HRwfnQqF2Fn5G2Uuo7G46Qbw9ZCj6ni+Yf3y5INqsb557A2kXFwEVJn35zlIhwp2mhqcdn3q0ie/N19hkdvRkvmMZqEuRHcamlK24j/tq509Q760njhZ/DTzgwgko+o1bDpGgXURMd5zMZW+YFTKiP5rm5bSiVxkmRtIUf5hu9xtKq5qs3cuwsSwhow8PJai8WfRekygnKQAXr0xcZWReHwqR3LQyULUtkrV4gcMv+5oKsNEEl/oJl4gNXAimE73XA6LSVNaj118XiByUSVo+Y/IdKNrx+dGMXVfUJHBap5HZodtienLEa1lz+/tg1s8slUjBcY6RLYy3lo9brwV9HOmrmY36SgWSheK5AsD0BshU+P+MflkgqVCk5kSIlq64q7ouDuDxxUo1mxVIciNy5ZbZKOVDPtQDqp13s/E61omB2kRaiXljl4NQuMl2B7XehtNjCOj3K4t+AAFB7ujDkuX8MRzyqTovmYNXVp/EP2/RmTv+mCGlizvD9MrWrPTZ1EJkXc/WlAxCJViP/lFm4DWMBPJzytcC+vxSrPvUToTFZ7aBoO/ES1hJcS/3N+OAoKzUp4l3HpEofjB0vW0fIUCvl0u/4ANDXwyy2gNvEW+5Bq4lTyGCp8bw35cPgydroVoMC5o4ETRlmW8C4lhjd5gq0/VTN0uc+sjTFP3f30cJGuHuQSa8azWeBJby37Wihbons4ZexRyi/YV/ZTabkiZ42uiazYCwAnWeZ4ldxFDYgraSvSmw3CoZh01JPIPbZKVGwwthJ+SJpavf1Wrxl7GqstAMVkz/U4EfVEZYmo2udLjMmWb81EkD/WtduJL9mWDZ47A5V23HIK5yfj1lYizVl78W4cgJkimfS3ihr97JLT9tVdWCw7AniKL6NAJYaFRX+p3OlURARD0hhISig0KFotdQfiTqgygkUPqp5I2QjRNHnIP/r07K7GXu2Bgha2RZyg3oxZnFSOW1TA+Ad/wBOF4Ss1RXfgP9ebiJMlUINwZIc615htP41q1y4tNyVuC8MnOKw0x+SK87uCVBQlsdIKbWbyYbZ2ePw2XQx4tz5pG0nnAVhWnv/HU7XZivF/CSpB2nzxzjlbtqosqcsn2G2AZDrmeMn0c/aLPvg0iJG1Q149kj21sDy6IBmw7QJxjPS6zvaz48B30Hi6OjKLGinyaJrha4CAqmsmDfg1YPWwozloEJTtAszUP8QLaHN6WZAZ1leZed4gPEJp8Ka6xcpe2qtk0zIcPGox9LwEz2rlNvk8RfXJHFOdEcy/3Hu9HHP0U5PO3al/rzlpd4GzlenpKBZFPPpIfucIAPpVZ15ij3TsAS/NkSTnNAAvQrJYM3ABHF+INlgT+jBUeJFEvYvdSXlpwr4Rjz993GICVHy6K9J3LWQCnbx+DqYdBxn66k8y/HQnLuUFIbR45x2NTy5m5V/Ea6Jb433xrZLNB+g6Z30t7896tAweCqhK4mRGcHlP196GsedlfvSHD7cAzYmm9LxLXxH9afs9Z7zObDs8gONznWu4mAYXzOmXqxMeW4wv7fyUIoWgj4Yef4IoKHShG49bG6/o+b6HH7m5nU3QqfD32hTCQOLRT3rKsBjzD8V39Peptl9m4/6wZXy+lCzWudp8soPWbWdU3yfAugTuViiIZ7/kRyYljha0XPcdCZmubJxn6O1fnm68/uRafg+ibI3MMALVUULmNtp40XomadHCq0KzgIQfVKfBX+pDQtOChuJL05I+6GMPNJFxDA0WE2VG+ZjdlVZK/R4ZvJLtciehSewQNr6rSziCp8iZlzi9JQXZmki2+jt524OvWirgVMbv6gpSe2ltkp1DxRYQgvRs/AP9xMEpOWBMB0aEivwyHps9IC+szyzjMBeomLPfIBwUsB4LRxjRE8jnNC87Lwwt9+QY8MvHZGzqVAEtdPpnaOQsO60OYx5JTmwpIU1KRyEjf50OYkFNvI+Ob9mUkc83f5x8eb26IV0/pr2qTClsD5TFHdcw9mnwWZUm2jebpWO9poMNRwICbHGoPUQkrfit6j+XZ8h+m6Om0Mvsw0OSnxacQBvGKZmLn1i7o9QsqmarfGEmFFcIM/dRwRb9I8pDYxgvBKXdbDmKB6D7mchx/gfam5bvaCKP7e6ygkQ/zX5Fxv2gx+U6KedgUdSpEiwLuwLrjXyCpWNF3kcuEP/gfBTkVTNtm93n3oqUH3Z/U/biBeVkdWsm1FwruG/LJ/ickjlOGjbrUw8eLdvklOVrJ7lgAtyvIFeeUQFEx5JIlqFMjwE57oeWYpLIi2euynuDmXcLVmS06lsjPhYiWNIgHgo/+l6U9AUEq6oJm+QbWRHh8c02aXSl3I1lLCXYnL0OE6ZL0M7/VVUtUg45A6eXADcEbs615SbisvtNX6vOgE+P3dA5IlfQHfYHW+TLw3ytM2ynLjHRRwDiSHhnKzSC32l79lzkls1PHcleC8lELojp4qkQC/n0RqOeN+OPn0QtS9+XgOpjlGyTy2+ik2/GeuJIWs66Qy4GQoWBSkkQ1duEC+0kzczLNtjp4J6iN/TjdePkPwFcwUrSQ5KnP+QZUSyEXQPvdlll65vNUg8sCaptDS/dNqADYybPIdkK24GYDzkwWieRtzGl0TrhKnv7NtksIXWXCwqXXtucLyxeEnSRVvaJfKy1kesB0Lzi42DRW2DaCsK9gXxBoqUWqlM5DX/mx2dCiD4kJD/adFBy30lMWrgrZtAD3afom+/ZgYwFe1uz+g8CGM/UcmKv57xSU3hCY1aUWJtFf8Ynt5AQ+wP/dHZy8aJ9pvjnta3XbsOr9UoiY5pUKEmhXP5Sddscl+J6YBs0MARB0XP4AA==);',
    );

    console.group('Project');
    console.log(`Project name: %c${pkg.name}`, 'color: #00b894');
    console.log(`version: %c${pkg.version}`, 'color: #00b894');
    console.log(`Project description: %c${pkg.description}`, 'color: #00b894');
    console.log(`Project author: %c${pkg.author}`, 'color: #00b894');

    console.groupEnd();

    console.group('Core');
    console.group('Vue');
    console.log(`Vue.js version: %c${app.version}`, 'color: #00b894');
    console.groupEnd();
    console.groupEnd();
  },
};
